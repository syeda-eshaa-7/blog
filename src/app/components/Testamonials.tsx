
// components/TestimonialSection.jsx
export function TestimonialSection() {
    const testimonials = [
      {
        quote: "This service has been a game-changer for our business. Highly recommend!",
        name: "John Doe",
        position: "CEO, Company A"
      },
      {
        quote: "Amazing experience! The team was professional and the results were outstanding.",
        name: "Jane Smith",
        position: "Marketing Director, Company B"
      },
      {
        quote: "Exceptional service and support. We couldn't be happier with the results.",
        name: "Michael Brown",
        position: "CTO, Company C"
      }
    ];
  
    return (
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Hear from our satisfied customers</p>
          </div>
          <div className="flex flex-wrap justify-center">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full sm:2 lg:w-1/3 p-4">
                <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                  <p className="text-gray-600 dark:text-gray-400">{testimonial.quote}</p>
                  <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</h3>
                  <p className="text-gray-500 dark:text-gray-300">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  