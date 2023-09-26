import Card from "@/app/components/ui/Card";

export const metadata = {
    title: 'About | E-Marketplace',
    description: 'About page for E-Marketplace',
}

function AboutPage() {
    return (
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
          {info.map(({ title, description, logo, large, delay }) => (
              <Card
                  key={title}
                  title={title}
                  description={description}
                  large={large}
                  logo={logo}
                  delay={delay}
              />
          ))}
      </div>
    )
}

const info = [
    {
      title: "Simple Design",
      description: "Front-end design, animations, reusable UI components and more stuff were made using Tailwind CSS",
      large: true,
      logo: (
        <img src='https://user-images.githubusercontent.com/98990/89711240-4172a200-d989-11ea-8d51-4aaf922fa407.png' alt='Tailwind Logo' width={250} height={250}/>
      ),
      delay:'1.0s'
    },
    {
      title: "User System",
      description: "User authentication system with NextAuth.js powered by Next.js",
      logo: (
        <img src='https://miro.medium.com/v2/resize:fit:1400/1*Ym49V8ztVW4I2N5NcO8C8Q.png' alt='NextAuth logo' width={300} height={300}/>
      ),
      delay:'1.5s'
    },
    {
      title: "Easy back-end",
      description: "Next.js REST API made with MongoDB and Prisma ORM.",
      logo: (
        <img src='https://res.cloudinary.com/hevo/image/upload/v1626694700/hevo-blog/MongoDB-sm-logo-500x400-1-1.gif' alt='MongoDB logo' width={300} height={300}/>
      ),
      delay:'2.0s'
    },
    {
      title: "Uploading with Cloudinary",
      description: "Image and other content uploading without using local storage. Only through cloud service.",
      logo: (
        <img src='https://mms.businesswire.com/media/20220110005607/en/821955/23/cloudinary_cloud_glyph_blue_png.jpg' alt='Cloudinary logo' width={300} height={300}/>
      ),
      delay:'2.5s'
    },
    {
      title: "Hooks, utilities, and more",
      description: "Many hooks, help functions and using Zustand as state manager.",
      delay:'3.0s'
    },
];
  



export default AboutPage
