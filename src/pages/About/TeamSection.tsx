import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const team = [
  {
    name: "Vikram Patel",
    role: "Founder & CEO",
    bio: "25 years in architecture and material innovation. Vikram founded Lamiwood to bridge the gap between global material quality and Indian design ambition.",
  },
  {
    name: "Ananya Krishnan",
    role: "Head of Design",
    bio: "Former principal at Studio Mumbai. Ananya leads our product design and curates collections that balance aesthetic vision with practical performance.",
  },
  {
    name: "Rajesh Thakur",
    role: "Production Director",
    bio: "Master craftsman with three decades in timber processing. Rajesh ensures every surface meets our uncompromising quality standards.",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <SectionHeading
          title="The Minds Behind Lamiwood"
          subtitle="A team united by a passion for exceptional surfaces and the spaces they create."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-beige dark:bg-white/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-serif text-2xl text-charcoal-light">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-1">
                  {member.name}
                </h3>
                <p className="text-gold text-sm mb-3">{member.role}</p>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
