import Icon, { IconName } from "../Icon";

type FeatureProps = {
  title: string;
  description: string;
  iconName: IconName;
};
const featureList: FeatureProps[] = [
  {
    title: "Secure and Reliable",
    description:
      "Built on robust blockchain technology, Soulinus guarantees the security and integrity of your digital asset transfers. Your legacy is in safe hands.",
    iconName: "shield-check",
  },
  {
    title: "Simple Setup",
    description:
      "Create your digital will in minutes. Our intuitive platform makes it easy to assign your assets to your chosen beneficiaries without the need for complex legal procedures.",
    iconName: "swatch-book",
  },
  {
    title: "Transparent Process",
    description:
      "With Soulinus, every transaction is transparent and recorded on the blockchain, ensuring complete traceability and peace of mind.",
    iconName: "blend",
  },
  {
    title: "Immediate Execution",
    description:
      "Upon verification of the trigger event, Soulinus immediately executes your predefined instructions, ensuring your assets are transferred without delay.",
    iconName: "activity",
  },
];

function FeatureCard({ title, description, iconName }: FeatureProps) {
  return (
    <div className="relative flex flex-col items-center">
      <Icon name={iconName} size={40} />
      <h4 className="h4 mb-2">{title}</h4>
      <p className="text-center text-lg text-gray-400">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}

          {/* Items */}
          <div
            className="mx-auto grid max-w-sm items-start gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-2 lg:gap-16"
            data-aos-id-blocks
          >
            {featureList.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                iconName={feature.iconName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
