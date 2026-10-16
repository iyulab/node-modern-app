// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';

/**
 * The discard-changes dialog is a lazily loaded module. When that load fails — a deployment replaced the hashed chunk
 * while a tab with an edited form stayed open, or the network is gone — the guard must still ask. Before, the import
 * rejection reached the router as «the guard threw», the router stayed put, and every navigation was silently blocked.
 */

vi.mock('@iyulab/components/dist/utilities/Dialog.js', () => {
  throw new Error('Failed to fetch dynamically imported module (404)');
});

const { confirmDiscardChanges, trackUnsavedChanges, unsavedChangesGuard } = await import('../src/unsaved.js');

// happy-dom's window has no confirm — install one per test.
const stubConfirm = (answer: boolean) => {
  const fn = vi.fn(() => answer);
  (window as unknown as { confirm: typeof fn }).confirm = fn;
  return fn;
};
afterEach(() => {
  vi.restoreAllMocks();
  delete (window as unknown as { confirm?: unknown }).confirm;
});

describe('discard-changes guard when its dialog cannot load', () => {
  it('asks with window.confirm, and leaving follows the answer', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const confirm = stubConfirm(true);
    expect(await confirmDiscardChanges({ title: 'Discard?', message: 'Unsaved edits will be lost.' })).toBe(true);
    expect(confirm).toHaveBeenCalledWith('Discard?\n\nUnsaved edits will be lost.');
    expect(warn.mock.calls[0]?.[0]).toMatch(/^\[@iyulab\/modern-app\]/);

    confirm.mockReturnValue(false);
    expect(await confirmDiscardChanges()).toBe(false);
  });

  it('the router guard asks once there are unsaved changes, and the answer lets the user leave', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const confirm = stubConfirm(true);
    const release = trackUnsavedChanges(() => true);
    try {
      expect(await unsavedChangesGuard()).toBe(true);
      expect(confirm).toHaveBeenCalledTimes(1);
    } finally {
      release();
    }
  });

  it('NEGATIVE with nothing unsaved the guard does not ask', async () => {
    const confirm = stubConfirm(true);
    expect(await unsavedChangesGuard()).toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });
});
