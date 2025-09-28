import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="bg-background">
      <header className="py-24 bg-card">
        <div className="container-fluid mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Privacy Policy
          </motion.h1>
        </div>
      </header>
      <main className="py-20">
        <div className="container-fluid mx-auto px-4">
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>1. Introduction</h2>
            <p>
              Welcome to AquaPump. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </li>
              <li>
                <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
              </li>
            </ul>

            <h2>3. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to... [details would be filled in here].
            </p>

            <h2>4. Cookie Policy</h2>
            <p>
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at: privacy@aquapump.com.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;