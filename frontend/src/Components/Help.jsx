import React from 'react';

const Help = () => {
    const ContactSection = () => {
        return (
            <div className="mb-4 contact">
                <h2>Contact Us</h2>
                <p>If you have any further questions, feel free to contact our support team:</p>
                <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
                <p>Phone: (123) 456-7890</p>
            </div>
        );
    };

    const faqData = [
        {
            question: 'What services do you provide?',
            answer: 'We offer a range of services including web development, mobile app development, and consulting services for businesses.'
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can contact our customer support team through email at support@example.com or by calling our helpline at (123) 456-7890.'
        },
        {
            question: 'Do you offer refunds for your products?',
            answer: 'Yes, we have a refund policy in place. Please review our refund policy on our website or contact our support team for more details.'
        }
    ];

    return (
        <div className="container mt-5">
            <ContactSection />
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <h2 className="mb-4">Frequently Asked Questions (FAQ)</h2>
                {faqData.map((item, index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#flush-collapse${index + 1}`}
                                aria-expanded="false"
                                aria-controls={`flush-collapse${index + 1}`}
                            >
                                {item.question}
                            </button>
                        </h2>
                        <div
                            id={`flush-collapse${index + 1}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">{item.answer}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;
