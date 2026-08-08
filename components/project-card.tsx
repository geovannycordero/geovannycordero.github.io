'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar } from 'lucide-react';
import { Github } from '@/components/icons';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const TECH_CHIP_CLASSES =
  'rounded-sm border border-line px-2 py-1 font-mono text-xs text-accent-brand dark:border-line/30';

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Stagger the animation of cards with reduced delay for better performance
    const timeoutId = setTimeout(() => setIsVisible(true), 50 + index * 100);
    return () => clearTimeout(timeoutId);
  }, [index]);

  return (
    <div
      id={project.id}
      className={`scroll-mt-24 border border-line bg-surface transition-all duration-300 hover:border-accent-brand dark:border-line/20 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className='relative overflow-hidden'>
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
            <Badge className='bg-accent-brand text-paper text-xs'>
              Featured
            </Badge>
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-1.5 p-6 pb-3'>
        <div className='flex items-start justify-between gap-2'>
          <h2 className='text-xl font-semibold leading-none tracking-tight text-ink hover:text-accent-brand transition-colors line-clamp-2'>
            {project.title}
          </h2>
          <div className='flex items-center gap-1 text-xs text-ink-muted'>
            <Calendar className='h-3 w-3' />
            <span>{project.completedDate}</span>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Badge
            variant='outline'
            className='text-xs border-line text-accent-brand dark:border-line/30'
          >
            {project.category}
          </Badge>
        </div>

        {project.employer && (
          <p className='text-xs text-ink-muted'>
            Delivered while at {project.employer}
          </p>
        )}
      </div>

      <div className='space-y-4 p-6 pt-0'>
        <p className='text-ink-muted text-sm leading-relaxed line-clamp-3'>
          {project.description}
        </p>

        <div className='space-y-3'>
          <div className='flex flex-wrap gap-2'>
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className={TECH_CHIP_CLASSES}>
                {tech}
              </span>
            ))}
          </div>

          <div className='flex items-center gap-3 pt-2'>
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors text-sm font-medium'
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
                className='inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors text-sm font-medium'
                aria-label={`Visit ${project.title} live site`}
              >
                <ExternalLink className='h-4 w-4' />
                <span className='hidden sm:inline'>Live Site</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
