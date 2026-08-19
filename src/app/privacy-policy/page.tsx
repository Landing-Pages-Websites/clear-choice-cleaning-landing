import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Clear Choice Home Cleaning",
  description:
    "Privacy Policy for Clear Choice Home Cleaning Services, including how we collect, use, and protect information and our SMS/text messaging practices.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <section>
      <h2 className="t-h3 mb-3 text-[var(--color-ink)]">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

const linkCls =
  "font-semibold text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary-hover)]";

export default function PrivacyPolicyPage(): React.ReactElement {
  return (
    <div className="overflow-x-hidden bg-white">
      <Header />
      <main className="min-h-screen bg-[var(--color-bg)] pt-24 text-[var(--color-text)] md:pt-28">
        <article className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
          <p className="eyebrow">Legal</p>
          <h1 className="t-h1 mt-3">Privacy Policy</h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Clear Choice Home Cleaning Services · Effective date: August 20, 2026
          </p>

          <div className="mt-10 space-y-10 text-[1rem] leading-8 text-[var(--color-muted)]">
            <Section title="Who we are">
              <p>
                Our website address is:{" "}
                <a href="https://clearchoicehomecleaningservices.com/" className={linkCls}>
                  https://clearchoicehomecleaningservices.com
                </a>
                . This policy also applies to our booking page at{" "}
                <a href="https://book.clearchoicehomecleaningservices.com/" className={linkCls}>
                  https://book.clearchoicehomecleaningservices.com
                </a>
                . Using this Website does not constitute SMS consent.
              </p>
            </Section>

            <Section title="Comments">
              <p>
                When visitors leave comments on the site we collect the data shown in the comments
                form, and also the visitor’s IP address and browser user agent string to help spam
                detection.
              </p>
              <p>
                An anonymized string created from your email address (also called a hash) may be
                provided to the Gravatar service to see if you are using it. The Gravatar service
                privacy policy is available here:{" "}
                <a
                  href="https://automattic.com/privacy/"
                  className={linkCls}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://automattic.com/privacy/
                </a>
                . After approval of your comment, your profile picture is visible to the public in
                the context of your comment.
              </p>
            </Section>

            <Section title="Media">
              <p>
                If you upload images to the website, you should avoid uploading images with
                embedded location data (EXIF GPS) included. Visitors to the website can download
                and extract any location data from images on the website.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                If you leave a comment on our site you may opt-in to saving your name, email
                address and website in cookies. These are for your convenience so that you do not
                have to fill in your details again when you leave another comment. These cookies
                will last for one year.
              </p>
              <p>
                If you visit our login page, we will set a temporary cookie to determine if your
                browser accepts cookies. This cookie contains no personal data and is discarded
                when you close your browser.
              </p>
              <p>
                When you log in, we will also set up several cookies to save your login information
                and your screen display choices. Login cookies last for two days, and screen
                options cookies last for a year. If you select “Remember Me”, your login will
                persist for two weeks. If you log out of your account, the login cookies will be
                removed.
              </p>
              <p>
                If you edit or publish an article, an additional cookie will be saved in your
                browser. This cookie includes no personal data and simply indicates the post ID of
                the article you just edited. It expires after 1 day.
              </p>
            </Section>

            <Section title="Embedded content from other websites">
              <p>
                Articles on this site may include embedded content (e.g. videos, images, articles,
                etc.). Embedded content from other websites behaves in the exact same way as if the
                visitor has visited the other website.
              </p>
              <p>
                These websites may collect data about you, use cookies, embed additional
                third-party tracking, and monitor your interaction with that embedded content,
                including tracking your interaction with the embedded content if you have an
                account and are logged in to that website.
              </p>
            </Section>

            <Section title="Who we share your data with">
              <p>
                If you request a password reset, your IP address will be included in the reset
                email.
              </p>
              <p>
                When you request a free cleaning quote, we collect the details you submit —
                typically your name, email address, phone number, ZIP code, cleaning type, and
                related information about your space. We use this to prepare your quote and
                communicate with you about scheduling.
              </p>
              <p>
                We may share information with service providers who help us host the website,
                process forms, or deliver communications, and only as needed to provide those
                services. We may also disclose information when required by law or to protect our
                rights, customers, or safety.
              </p>
              <p>
                Your mobile information will not be sold or shared with third parties for
                promotional or marketing purposes. We will not share mobile information with third
                parties for promotional or marketing purposes. All the above categories exclude
                text messaging originator opt-in data and consent; this information will not be
                shared with any third parties. We will not share your opt-in to an SMS campaign
                with any third party for purposes unrelated to providing you with the services of
                that campaign. We may share your Personal Data, including your SMS opt-in or
                consent status, with third parties that help us provide our messaging services,
                including but not limited to platform providers, phone companies, and any other
                vendors who assist us in the delivery of text messages.
              </p>
            </Section>

            <Section title="How long we retain your data">
              <p>
                If you leave a comment, the comment and its metadata are retained indefinitely.
                This is so we can recognize and approve any follow-up comments automatically
                instead of holding them in a moderation queue.
              </p>
              <p>
                For users that register on our website (if any), we also store the personal
                information they provide in their user profile. All users can see, edit, or delete
                their personal information at any time (except they cannot change their username).
                Website administrators can also see and edit that information.
              </p>
            </Section>

            <Section title="What rights you have over your data">
              <p>
                If you have an account on this site, or have left comments, you can request to
                receive an exported file of the personal data we hold about you, including any data
                you have provided to us. You can also request that we erase any personal data we
                hold about you. This does not include any data we are obliged to keep for
                administrative, legal, or security purposes. Reply STOP to opt out of SMS at any
                time.
              </p>
            </Section>

            <Section title="Where your data is sent">
              <p>
                Visitor comments may be checked through an automated spam detection service.
              </p>
            </Section>

            <section className="rounded-2xl bg-[var(--color-surface)] p-5 md:p-7">
              <h2 className="t-h3 mb-4 text-[var(--color-ink)]">SMS / Text Messaging</h2>
              <div className="space-y-4">
                <p>
                  If you affirmatively check the optional SMS consent checkbox on our website form,
                  Clear Choice Home Cleaning Services may send you SMS/text messages. These
                  messages may include quote follow-ups, appointment confirmations, scheduling
                  reminders, and service updates. Providing a phone number or submitting the form
                  without checking the SMS box does not constitute consent to receive text
                  messages. Using this Website also does not constitute SMS consent.
                </p>
                <p>
                  Message frequency may vary. Standard Message and Data Rates may apply. Consent is
                  not a condition of purchase. Reply STOP to opt out. Reply HELP for help or
                  contact us at{" "}
                  <a href="mailto:michael@clearchoicehomecleaningservices.com" className={linkCls}>
                    michael@clearchoicehomecleaningservices.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+14706228884" className={linkCls}>
                    (470) 622-8884
                  </a>
                  .
                </p>
                <p>
                  Your mobile information will not be sold or shared with third parties for
                  promotional or marketing purposes. We will not share mobile information with
                  third parties for promotional or marketing purposes.
                </p>
                <p>
                  All the above categories exclude text messaging originator opt-in data and
                  consent; this information will not be shared with any third parties. We will not
                  share your opt-in to an SMS campaign with any third party for purposes unrelated
                  to providing you with the services of that campaign. We may share your Personal
                  Data, including your SMS opt-in or consent status, with third parties that help
                  us provide our messaging services, including but not limited to platform
                  providers, phone companies, and any other vendors who assist us in the delivery
                  of text messages.
                </p>
                <p>
                  Your phone number is used solely for communicating with you about the services
                  you requested.
                </p>
              </div>
            </section>

            <Section title="Contact Us">
              <p>
                Clear Choice Home Cleaning Services
                <br />
                5905 Atlanta Hwy Ste 101 #1243
                <br />
                Alpharetta, GA 30004
                <br />
                Email:{" "}
                <a href="mailto:michael@clearchoicehomecleaningservices.com" className={linkCls}>
                  michael@clearchoicehomecleaningservices.com
                </a>
                <br />
                Phone:{" "}
                <a href="tel:+14706228884" className={linkCls}>
                  (470) 622-8884
                </a>
              </p>
            </Section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
