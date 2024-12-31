// components/sections/PricingSection.tsx
import { Button } from "@/components/ui/button";

const pricingPlans = [
    {
        name: "Basic",
        price: "$10/month",
        features: ["10GB Storage", "Basic Support", "Single User", "Community Access", "Weekly Updates"],
        isBestseller: false,
        strikethrough: 3
    },
    {
        name: "Standard",
        price: "$20/month",
        features: ["50GB Storage", "Priority Support", "Up to 5 Users", "Community Access", "Daily Updates"],
        isBestseller: true,
        strikethrough: 0
    },
    {
        name: "Premium",
        price: "$30/month",
        features: ["200GB Storage", "24/7 Support", "Unlimited Users", "Community Access", "Real-time Updates"],
        isBestseller: false,
        strikethrough: 0
    }
];

export default function PricingSection() {
    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Pricing Plans</h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Choose the plan that suits you best</p>
                </div>
                <div className="flex flex-wrap justify-center">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                            <div className={`p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center ${plan.isBestseller ? 'border-2 border-purple-500' : ''}`}>
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{plan.name}</h3>
                                <p className="mt-4 text-gray-500 dark:text-gray-300">{plan.price}</p>
                                {plan.isBestseller && (
                                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">
                                        Bestseller
                                    </span>
                                )}
                                <ul className="mt-6 mb-6 space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="text-gray-600 dark:text-gray-400">
                                            {featureIndex < plan.strikethrough ? <s>{feature}</s> : feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="mx-1 " variant="outline">Choose Plan</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
