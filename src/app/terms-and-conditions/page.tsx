import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions | Clear Choice Home Cleaning",
  description:
    "Terms and Conditions for Clear Choice Home Cleaning Services, including website use, free quotes, and SMS/text messaging.",
};

function Item({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <section>
      <h2 className="t-h3 mb-3 text-[var(--color-ink)]">
        {n}. {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

const linkCls =
  "font-semibold text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary-hover)]";

export default function TermsAndConditionsPage(): React.ReactElement {
  return (
    <div className="overflow-x-hidden bg-white">
      <Header />
      <main className="min-h-screen bg-[var(--color-bg)] pt-24 text-[var(--color-text)] md:pt-28">
        <article className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
          <p className="eyebrow">Legal</p>
          <h1 className="t-h1 mt-3">Terms and Conditions</h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Clear Choice Home Cleaning Services · Effective date: August 20, 2026
          </p>

          <div className="mt-10 space-y-10 text-[1rem] leading-8 text-[var(--color-muted)]">
            <section>
              <h2 className="t-h3 mb-3 text-[var(--color-ink)]">1. About Our Website</h2>
              <p>
                Website Address: Our official website address is{" "}
                <a href="https://clearchoicehomecleaningservices.com/" className={linkCls}>
                  https://clearchoicehomecleaningservices.com
                </a>
                . This booking page is{" "}
                <a href="https://book.clearchoicehomecleaningservices.com/" className={linkCls}>
                  https://book.clearchoicehomecleaningservices.com
                </a>
                .
              </p>
              <p>
                By using this website, you agree to comply with and be bound by these terms and
                conditions. A quote request or phone call does not create a service contract.
                Quotes are free and no-obligation.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3 text-[var(--color-ink)]">
                2. User Comments and Data Collection
              </h2>
              <p>
                Data Collected: When visitors leave comments on the site, we collect the data shown
                in the comments form, the visitor’s IP address, and the browser user agent string
                to aid in spam detection.
              </p>
              <p>
                Gravatar Service: An anonymized string created from your email address (also called
                a hash) may be provided to the Gravatar service to see if you are using it. The
                Gravatar service privacy policy is available here:{" "}
                <Link href="/privacy-policy" className={linkCls}>
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                Profile Picture: After approval of your comment, your profile picture will be
                visible to the public in the context of your comment.
              </p>
              <p>
                Data Retention: If you leave a comment, the comment and its metadata are retained
                indefinitely. This is to recognize and approve any follow-up comments automatically
                instead of holding them in a moderation queue.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3 text-[var(--color-ink)]">3. Media and Content Usage</h2>
              <p>
                Image Uploads: If you upload images to the website, you should avoid uploading
                images with embedded location data (EXIF GPS) included. Visitors to the website can
                download and extract any location data from images on the website.
              </p>
              <p>
                Embedded Content: Articles on this site may include embedded content (e.g., videos,
                images, articles, etc.) from other websites. Embedded content from other websites
                behaves in the exact same way as if the visitor has visited the other website.
                These external websites may collect data about you, use cookies, embed additional
                third-party tracking, and monitor your interaction with that embedded content.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3 text-[var(--color-ink)]">4. Use of Cookies</h2>
              <p>We use cookies to enhance your experience on our site:</p>
              <p>
                Commenter Convenience: If you leave a comment, you may opt-in to saving your name,
                email address, and website in cookies. These are for your convenience so you do not
                have to fill in your details again. These cookies will last for one year.
              </p>
              <p>
                Login Cookies: Temporary login cookies are set for our login page to determine if
                your browser accepts cookies. This cookie contains no personal data and is
                discarded when you close your browser. When you log in, we set up several cookies
                to save your login information (lasts two days) and screen display choices (lasts
                one year). Selecting “Remember Me” will persist your login for two weeks. If you
                log out, the login cookies will be removed.
              </p>
              <p>
                Editor Cookies: If you edit or publish an article, an additional cookie is saved
                that indicates the post ID of the article you just edited. It expires after 1 day.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3 text-[var(--color-ink)]">5. User Accounts and Data Rights</h2>
              <p>
                Registered Users (if applicable): For users that register on our website, we store
                the personal information they provide in their user profile. All users can see,
                edit, or delete their personal information at any time (except they cannot change
                their username). Website administrators can also see and edit that information.
              </p>
              <p>
                Your Data Rights: If you have an account or have left comments, you have the right
                to request an exported file of the personal data we hold about you, and to request
                that we erase any personal data we hold about you. This right does not include any
                data we are obliged to keep for administrative, legal, or security purposes.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3 text-[var(--color-ink)]">6. Sharing and Processing Your Data</h2>
              <p>
                Password Resets: If you request a password reset, your IP address will be included
                in the reset email.
              </p>
              <p>
                Spam Detection: Visitor comments may be checked through an automated spam detection
                service.
              </p>
              <p>
                Personal information submitted through this website is also handled in accordance
                with our{" "}
                <Link href="/privacy-policy" className={linkCls}>
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <h2 className="t-h3 text-[var(--color-ink)]">SMS Terms and Conditions</h2>

            <Item n={1} title="SMS Consent Communication">
              <p>
                Clear Choice Home Cleaning Services may send you SMS/text messages only if you
                affirmatively check the optional SMS consent checkbox on our website form.
                Providing a phone number or submitting a form without checking that box does not
                constitute consent. We will not share your phone number with any third parties for
                marketing purposes. Your mobile information will not be sold or shared with third
                parties for promotional or marketing purposes.
              </p>
            </Item>

            <Item n={2} title="Types of SMS Communications">
              <p>
                If you opt in to receive messages from Clear Choice Home Cleaning Services, you may
                receive texts about quote follow-ups, appointment confirmations, scheduling
                reminders, and service updates. Message frequency may vary. Standard Message and
                Data Rates may apply.
              </p>
            </Item>

            <Item n={3} title="Message Frequency">
              <p>Message frequency may vary.</p>
            </Item>

            <Item n={4} title="Carrier Charges">
              <p>
                Message and data rates may apply based on your mobile carrier and location.
                Carriers are not liable for delayed or undelivered messages.
              </p>
            </Item>

            <Item n={5} title="Opt-In Methods">
              <p>
                You can opt in by checking the optional SMS consent checkbox on{" "}
                <a href="https://book.clearchoicehomecleaningservices.com/" className={linkCls}>
                  https://book.clearchoicehomecleaningservices.com/
                </a>
                . The website checkbox is optional and unchecked by default.
              </p>
            </Item>

            <Item n={6} title="Opt-Out Instructions">
              <p>
                You may opt out at any time by replying STOP to any message. After you opt out, no
                further SMS messages will be sent. To resume receiving texts, reply START.
              </p>
            </Item>

            <Item n={7} title="Help">
              <p>
                If you need assistance, reply HELP or call{" "}
                <a href="tel:+14706228884" className={linkCls}>
                  (470) 622-8884
                </a>{" "}
                or email{" "}
                <a href="mailto:michael@clearchoicehomecleaningservices.com" className={linkCls}>
                  michael@clearchoicehomecleaningservices.com
                </a>
                .
              </p>
            </Item>

            <Item n={8} title="Disclosures">
              <ul className="list-disc space-y-2 pl-6">
                <li>Message frequency may vary.</li>
                <li>Message and data rates may apply.</li>
                <li>Reply STOP to cancel.</li>
                <li>Reply HELP for assistance.</li>
                <li>Consent is not a condition of purchase.</li>
                <li>
                  Your mobile information will not be sold or shared with third parties for
                  promotional or marketing purposes.
                </li>
              </ul>
              <p>
                Visit our{" "}
                <Link href="/privacy-policy" className={linkCls}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-and-conditions" className={linkCls}>
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </Item>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
