/**
 * Contact Service - Handles contact form submissions
 * Complete implementation for form submission flow
 */

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export class ContactService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
  }

  public async submitContactForm(
    data: ContactFormData,
  ): Promise<ContactResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to submit form" }));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const result: ContactResponse = await response.json();
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit contact form";
      throw new Error(errorMessage);
    }
  }
}

export const contactService = new ContactService();
