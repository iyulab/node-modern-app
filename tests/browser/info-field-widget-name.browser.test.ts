import { describe, it, expect, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '@iyulab/components/dist/components/progress-bar/UProgressBar.js';
import '@iyulab/components/dist/components/spinner/USpinner.js';
import '../../src/components/InfoField.js';
import type { InfoField } from '../../src/components/InfoField.js';

/**
 * `u-info-field`'s label names an unnamed progress bar or meter in its slot.
 *
 * Defect: the label sat next to the widget on screen but nothing tied them together, so a progress bar in a
 * labelled field was an unnamed progressbar (axe `aria-progressbar-name`, WCAG 1.3.1). Text values need nothing —
 * they are read right after the label. A widget that already has a name keeps it (NEGATIVE cases).
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
afterEach(() => document.body.replaceChildren());

async function mount(html: string): Promise<void> {
  document.body.innerHTML = html;
  await sleep(150);
}

describe('u-info-field names the widget it labels', () => {
  it('a progress bar takes the label as its name', async () => {
    await mount(`<u-info-field label="Completion"><u-progress-bar value="64"></u-progress-bar></u-info-field>`);
    expect(page.getByRole('progressbar', { name: 'Completion', exact: true }).elements().length).toBe(1);
  });

  it('a native <progress> and <meter> too', async () => {
    await mount(`
      <u-info-field label="Upload"><progress value="3" max="10"></progress></u-info-field>
      <u-info-field label="Disk"><meter value="0.6"></meter></u-info-field>`);
    expect(page.getByRole('progressbar', { name: 'Upload', exact: true }).elements().length).toBe(1);
    expect(page.getByRole('meter', { name: 'Disk', exact: true }).elements().length).toBe(1);
  });

  it('the name follows the label', async () => {
    await mount(`<u-info-field label="Before"><u-progress-bar value="10"></u-progress-bar></u-info-field>`);
    const field = document.querySelector('u-info-field') as InfoField;
    field.label = 'After';
    await field.updateComplete;
    await sleep(50);
    expect(document.querySelector('u-progress-bar')!.getAttribute('aria-label')).toBe('After');
  });
});

describe('a widget with its own name keeps it (NEGATIVE)', () => {
  it('an authored aria-label', async () => {
    await mount(`<u-info-field label="Completion"><u-progress-bar value="64" aria-label="Import"></u-progress-bar></u-info-field>`);
    expect(document.querySelector('u-progress-bar')!.getAttribute('aria-label')).toBe('Import');
  });

  it('the spinner\'s own default name', async () => {
    await mount(`<u-info-field label="Spinner"><u-spinner></u-spinner></u-info-field>`);
    expect(document.querySelector('u-spinner')!.getAttribute('aria-label')).toBe('Loading');
  });

  it('a text value gets nothing', async () => {
    await mount(`<u-info-field label="Customer"><span>Dongseo</span></u-info-field>`);
    expect(document.querySelector('span')!.hasAttribute('aria-label')).toBe(false);
  });
});
