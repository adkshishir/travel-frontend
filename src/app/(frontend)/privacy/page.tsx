import { Metadata } from 'next';
import { Shield, Eye, Lock, Database, Globe, UserCheck, Settings, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Traveltreks',
  description: 'Privacy policy for Traveltreks. Learn how we collect, use, and protect your personal information when you book our trekking services.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="mt-8 text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Traveltreks ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our trekking services.
              </p>
              <p>
                This policy applies to all information collected through our website, mobile applications, 
                and any related services, sales, marketing, or events.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">2.1 Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Postal address and billing information</li>
                <li>Passport details and nationality</li>
                <li>Emergency contact information</li>
                <li>Medical conditions and dietary requirements</li>
                <li>Travel insurance details</li>
                <li>Payment and transaction information</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">2.2 Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Device type and operating system</li>
                <li>Website usage patterns and preferences</li>
                <li>Cookies and tracking technologies</li>
                <li>Location data (with your consent)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">2.3 Communication Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Emails, messages, and correspondence</li>
                <li>Customer service interactions</li>
                <li>Feedback and reviews</li>
                <li>Social media interactions</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>We use your information for the following purposes:</p>
              
              <h3 className="text-lg font-semibold text-gray-800">3.1 Service Provision</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process bookings and arrange trekking services</li>
                <li>Obtain necessary permits and documentation</li>
                <li>Arrange accommodation, transportation, and guides</li>
                <li>Provide customer support and assistance</li>
                <li>Handle emergency situations and evacuations</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">3.2 Communication</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send booking confirmations and itineraries</li>
                <li>Provide trip updates and important notifications</li>
                <li>Send marketing materials (with your consent)</li>
                <li>Respond to inquiries and feedback</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">3.3 Legal and Business</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with legal obligations and regulations</li>
                <li>Protect against fraud and security threats</li>
                <li>Improve our services and website functionality</li>
                <li>Conduct business analysis and market research</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">4. Information Sharing</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>We may share your information with:</p>
              
              <h3 className="text-lg font-semibold text-gray-800">4.1 Service Providers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hotels, lodges, and accommodation providers</li>
                <li>Transportation companies and airlines</li>
                <li>Local guides and porters</li>
                <li>Permit offices and government agencies</li>
                <li>Insurance companies (for claims)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">4.2 Third-Party Services</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Email marketing platforms</li>
                <li>Website analytics providers (Google Analytics)</li>
                <li>Customer support tools</li>
                <li>Cloud storage providers</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <p className="font-semibold text-blue-800">Important:</p>
                <p className="text-blue-700">
                  We never sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">5. Cookies and Tracking Technologies</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve website performance and security</li>
                <li>Enable social media integration</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">Cookie Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">Required for website functionality</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">Help us understand website usage</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">Used for targeted advertising</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Preference Cookies</h4>
                  <p className="text-sm text-gray-600">Remember your choices</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">6. Data Security</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>We implement appropriate security measures to protect your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and data centers</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and staff training</li>
                <li>Data backup and recovery procedures</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <p className="font-semibold text-yellow-800">Note:</p>
                <p className="text-yellow-700">
                  While we strive to protect your information, no method of transmission over the Internet 
                  or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">7. Your Privacy Rights</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>You have the following rights regarding your personal information:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Access</h4>
                  <p className="text-sm">Request a copy of your personal data</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Correction</h4>
                  <p className="text-sm">Update or correct inaccurate information</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Deletion</h4>
                  <p className="text-sm">Request deletion of your personal data</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Portability</h4>
                  <p className="text-sm">Receive your data in a portable format</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Restriction</h4>
                  <p className="text-sm">Limit how we process your data</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Objection</h4>
                  <p className="text-sm">Object to certain processing activities</p>
                </div>
              </div>

              <p className="mt-6">
                To exercise these rights, please contact us using the information provided below. 
                We will respond to your request within 30 days.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">8. Data Retention</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>We retain your personal information for different periods depending on the purpose:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Booking Records:</strong> 7 years for tax and legal purposes</li>
                <li><strong>Marketing Data:</strong> Until you unsubscribe or withdraw consent</li>
                <li><strong>Website Data:</strong> 2 years for analytics purposes</li>
                <li><strong>Communication Records:</strong> 3 years for customer service</li>
                <li><strong>Emergency Contacts:</strong> Duration of the trip plus 1 year</li>
              </ul>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">9. International Data Transfers</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Your information may be transferred to and processed in countries other than Nepal. 
                We ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adequacy decisions by relevant authorities</li>
                <li>Standard contractual clauses</li>
                <li>Binding corporate rules</li>
                <li>Certification schemes</li>
              </ul>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">10. Changes to This Policy</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Sending email notifications for significant changes</li>
                <li>Displaying prominent notices on our website</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">11. Contact Us</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Traveltreks - Privacy Officer</strong></p>
                <p>Thamel, Kathmandu, Nepal</p>
                <p>Phone: +977-1-4123456</p>
                <p>Email: privacy@traveltreks.com</p>
                <p>General Email: info@traveltreks.com</p>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t pt-8">
            <div className="bg-primary/10 p-6 rounded-lg">
              <p className="text-gray-800 font-medium">
                By using our website and services, you acknowledge that you have read and understood this 
                Privacy Policy and agree to the collection and use of your information as described herein.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 