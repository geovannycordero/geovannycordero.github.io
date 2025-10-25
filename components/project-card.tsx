'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Stagger the animation of cards with reduced delay for better performance
    const timeoutId = setTimeout(() => setIsVisible(true), 50 + index * 100);
    return () => clearTimeout(timeoutId);
  }, [index]);

  return (
    <Card
      className={`card-elegant hover-lift transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className='relative overflow-hidden rounded-t-lg'>
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className='w-full h-48 object-cover transition-transform duration-300 hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
        {project.featured && (
          <div className='absolute top-3 right-3'>
            <Badge className='bg-emerald-600 text-white text-xs'>
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2'>
          <CardTitle className='text-xl text-sage-900 hover:text-emerald-700 transition-colors line-clamp-2'>
            {project.title}
          </CardTitle>
          <div className='flex items-center gap-1 text-xs text-sage-600'>
            <Calendar className='h-3 w-3' />
            <span>{project.completedDate}</span>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Badge
            variant='outline'
            className='text-xs border-emerald-300 text-emerald-700'
          >
            {project.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-sage-700 text-sm leading-relaxed line-clamp-3'>
          {project.description}
        </p>

        <div className='space-y-3'>
          <div className='flex flex-wrap gap-2'>
            {project.technologies.map((tech, techIndex) => (
              <Badge
                key={techIndex}
                variant='secondary'
                className='text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors'
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className='flex items-center gap-3 pt-2'>
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors text-sm font-medium'
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className='h-4 w-4' />
                <span className='hidden sm:inline'>GitHub</span>
              </Link>
            )}

            {project.projectUrl && (
              <Link
                href={project.projectUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors text-sm font-medium'
                aria-label={`Visit ${project.title} live site`}
              >
                <ExternalLink className='h-4 w-4' />
                <span className='hidden sm:inline'>Live Site</span>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
