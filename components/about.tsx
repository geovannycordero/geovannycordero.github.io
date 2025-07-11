import { Card, CardContent } from '@/components/ui/card';
import { Code, Users, Trophy, GraduationCap } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Code,
      title: '5+ Years Experience',
      description: 'Full-stack development with modern technologies',
    },
    {
      icon: Users,
      title: 'Team Leadership',
      description: 'Managing and mentoring development teams',
    },
    {
      icon: Trophy,
      title: 'Award Winner',
      description: '2020 Programathon Competition Champion',
    },
    {
      icon: GraduationCap,
      title: 'Continuous Learning',
      description: 'Currently pursuing MBA in Project Management',
    },
  ];

  return (
    <section id='about' className='py-20 bg-emerald-50/30'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-sage-900'>
            About Me
          </h2>
          <p className='text-lg text-sage-700 max-w-2xl mx-auto'>
            A passionate software engineer dedicated to creating innovative
            solutions and leading high-performing development teams.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {highlights.map((item, index) => (
            <Card
              key={index}
              className='text-center p-6 card-elegant hover-lift'
            >
              <CardContent className='space-y-4'>
                <div className='mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center'>
                  <item.icon className='h-6 w-6 text-emerald-600' />
                </div>
                <h3 className='font-semibold text-sage-900'>{item.title}</h3>
                <p className='text-sm text-sage-600'>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='max-w-4xl mx-auto'>
          <div className='prose prose-lg max-w-none'>
            <p className='text-sage-700 leading-relaxed mb-6'>
              I am a passionate Full-Stack Software Engineer with over 5 years
              of experience in developing and maintaining robust applications
              using cutting-edge technologies. My expertise spans across Golang,
              Ruby on Rails, and JavaScript ecosystems, with a strong focus on
              delivering high-quality software solutions.
            </p>
            <p className='text-sage-700 leading-relaxed mb-6'>
              Throughout my career at Pernix Solutions, I have progressed from
              an Apprentice to Software Engineer III and Supervisor of the
              Apprentice Program. This journey has given me unique insights into
              both technical excellence and team development, allowing me to
              mentor new talent while leading complex projects from conception
              to completion.
            </p>
            <p className='text-sage-700 leading-relaxed'>
              I thrive in collaborative environments, having worked with
              international teams across the US, Colombia, Australia, and India.
              Currently pursuing an MBA with a focus on Project Management, I am
              committed to enhancing my leadership skills and expanding my
              technical expertise in DevOps and emerging technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
