const FAQ = () => {
    return (
        <div className="my-6">
            <div className="py-7 w-2/3 md:w-1/2 mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-700">Frequently Asked Questions (FAQ)</h1>
                <p className="text-center">Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <details className="collapse collapse-arrow bordermy-2 border-base-100" name="my-accordion-det-1" open>
                <summary className="collapse-title font-semibold">How does this posture corrector work?</summary>
                <div className="collapse-content text-sm bg-cyan-100 py-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Voluptatum ullam doloribus nostrum quisquam libero placeat laborum velit tenetur quis repudiandae.</div>
            </details>

            <details className="collapse collapse-arrow bordermy-2 border-base-100" name="my-accordion-det-1">
                <summary className="collapse-title font-semibold">Is it suitable for all ages and body types?</summary>
                <div className="collapse-content text-sm bg-cyan-100 py-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, libero?
                </div>
            </details>

            <details className="collapse collapse-arrow bordermy-2 border-base-100" name="my-accordion-det-1">
                <summary className="collapse-title font-semibold">Does it really help with back pain and posture improvement?</summary>
                <div className="collapse-content text-sm bg-cyan-100 py-4">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
            </details>

            <details className="collapse collapse-arrow bordermy-2 border-base-100" name="my-accordion-det-1">
                <summary className="collapse-title font-semibold">Does it have smart features like vibration alerts?</summary>
                <div className="collapse-content text-sm bg-cyan-100 py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, aliquam.</div>
            </details>

            <details className="collapse collapse-arrow bordermy-2 border-base-100" name="my-accordion-det-1">
                <summary className="collapse-title font-semibold">How will I be notified when the product is back in stock?</summary>
                <div className="collapse-content text-sm bg-cyan-100 py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolor.</div>
            </details>
        </div>
    )
}
export default FAQ;