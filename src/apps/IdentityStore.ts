import { makeAutoObservable, runInAction } from "mobx";

export class IdentityStore {
  email: string | null = null;
  name: string | null = null;
  phone: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private async getClaimAsync(type: string): Promise<string | null> {
    try {
      const response = await fetch(`/identity/claims?type=${type}`);
      if (!response.ok) {
        return null;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const jsonData = await response.json();
        return typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData);
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error("Error fetching claim:", error);
      return null;
    }
  }

  async UpdateAsync() {
    type UpdateKey = 'email' | 'name' | 'phone';
    
    const updates: Array<{key: UpdateKey; type: string}> = [
      {
        key: 'email',
        type: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      },
      {
        key: 'name',
        type: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
      },
      {
        key: 'phone',
        type: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
      }
    ];

    const updatePromises = updates
      .filter(update => this[update.key] === null)
      .map(async update => {
        const value = await this.getClaimAsync(update.type);
        return { key: update.key, value };
      });

    const results = await Promise.all(updatePromises);

    runInAction(() => {
      results.forEach(({ key, value }) => {
        if (value !== null) {
          (this[key] as string | null) = value;
        }
      });
    });
  }
}

export const identityStore = new IdentityStore();