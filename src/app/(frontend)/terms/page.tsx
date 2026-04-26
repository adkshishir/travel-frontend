import { Metadata } from 'next';
import { Mountain, Shield, Clock, AlertTriangle, FileText, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Traveltreks',
  description: 'Terms and conditions for booking trekking packages with Traveltreks. Read our policies on bookings, cancellations, safety, and liability.',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before booking any trekking package with Traveltreks.
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
              <Mountain className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Welcome to Traveltreks. These terms and conditions ("Terms") govern your use of our services and website. 
                By booking any trekking package or using our services, you agree to be bound by these Terms.
              </p>
              <p>
                Traveltreks is a licensed trekking company based in Kathmandu, Nepal, specializing in trekking and 
                mountaineering expeditions in the Himalayas.
              </p>
            </div>
          </section>

          {/* Booking Terms */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">2. Booking Terms</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">2.1 Booking Process</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All bookings must be confirmed with a minimum 25% deposit</li>
                <li>Full payment is required 30 days before the trek start date</li>
                <li>Bookings are subject to availability and weather conditions</li>
                <li>We reserve the right to cancel trips due to insufficient participants (minimum 2 people)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">2.2 Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deposits are non-refundable except in cases of force majeure</li>
                <li>Payments can be made via bank transfer, credit card, or cash</li>
                <li>All prices are in USD unless otherwise specified</li>
                <li>Prices may change due to government tax increases or fuel price fluctuations</li>
              </ul>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">3. Cancellation Policy</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">3.1 Cancellation by Client</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li><strong>45+ days before departure:</strong> 25% of total cost</li>
                  <li><strong>30-44 days before departure:</strong> 50% of total cost</li>
                  <li><strong>15-29 days before departure:</strong> 75% of total cost</li>
                  <li><strong>Less than 15 days:</strong> 100% of total cost (no refund)</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">3.2 Cancellation by Company</h3>
              <p>
                We may cancel trips due to weather conditions, natural disasters, political unrest, or insufficient bookings. 
                In such cases, we will offer a full refund or alternative dates.
              </p>
            </div>
          </section>

          {/* Safety and Responsibility */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">4. Safety and Responsibility</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">4.1 Client Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain adequate physical fitness for the chosen trek</li>
                <li>Disclose any medical conditions or dietary requirements</li>
                <li>Follow guide instructions at all times</li>
                <li>Carry comprehensive travel and medical insurance</li>
                <li>Respect local customs, culture, and environment</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">4.2 Company Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide experienced and licensed guides</li>
                <li>Ensure safety equipment and first aid supplies</li>
                <li>Arrange accommodation and meals as specified</li>
                <li>Obtain necessary permits and documentation</li>
                <li>Provide emergency evacuation assistance</li>
              </ul>
            </div>
          </section>

          {/* Insurance and Liability */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">5. Insurance and Liability</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="font-semibold text-yellow-800">Important:</p>
                <p className="text-yellow-700">
                  All trekkers must have comprehensive travel insurance covering medical emergencies, 
                  helicopter evacuation, and trip cancellation.
                </p>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800">5.1 Limitation of Liability</h3>
              <p>
                Traveltreks acts as an intermediary and is not liable for any injury, loss, damage, or delay 
                caused by circumstances beyond our control, including but not limited to weather conditions, 
                natural disasters, political situations, or third-party services.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">5.2 Force Majeure</h3>
              <p>
                We are not responsible for any failure to perform our obligations due to circumstances beyond 
                our reasonable control, including natural disasters, government actions, war, terrorism, or 
                pandemic-related restrictions.
              </p>
            </div>
          </section>

          {/* Permits and Documentation */}
          <section>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">6. Permits and Documentation</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Valid passport with at least 6 months validity is required</li>
                <li>Nepal visa can be obtained on arrival or online</li>
                <li>We will arrange all necessary trekking permits (TIMS, National Park permits)</li>
                <li>Clients must provide passport copies and photos for permit processing</li>
                <li>Additional permits may be required for restricted areas</li>
              </ul>
            </div>
          </section>

          {/* Environmental Policy */}
          <section>
            <div className="flex items-center mb-4">
              <Mountain className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">7. Environmental Policy</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                We are committed to sustainable and responsible tourism. All trekkers must:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Follow Leave No Trace principles</li>
                <li>Respect wildlife and natural habitats</li>
                <li>Use designated trails and camping areas</li>
                <li>Properly dispose of waste and litter</li>
                <li>Support local communities and businesses</li>
              </ul>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">8. Changes to Terms</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Traveltreks reserves the right to modify these terms and conditions at any time. 
                Updated terms will be posted on our website with the revision date. Continued use of 
                our services after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">9. Contact Information</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>For questions about these terms and conditions, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Traveltreks</strong></p>
                <p>Thamel, Kathmandu, Nepal</p>
                <p>Phone: +977-1-4123456</p>
                <p>Email: info@traveltreks.com</p>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t pt-8">
            <div className="bg-primary/10 p-6 rounded-lg">
              <p className="text-gray-800 font-medium">
                By booking with Traveltreks, you acknowledge that you have read, understood, and 
                agree to be bound by these terms and conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 