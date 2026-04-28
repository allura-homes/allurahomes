// Default onboarding phases and tasks for new properties
export interface TaskTemplate {
  title: string
  description?: string
  task_order: number
  subtasks?: {
    title: string
    subtask_order: number
  }[]
}

export interface PhaseTemplate {
  name: string
  color: string
  phase_order: number
  tasks: TaskTemplate[]
}

export const onboardingTemplate: PhaseTemplate[] = [
  {
    name: 'Initial Setup',
    color: '#3B82F6', // blue
    phase_order: 0,
    tasks: [
      {
        title: 'Property Assessment',
        description: 'Complete initial property assessment and documentation',
        task_order: 0,
        subtasks: [
          { title: 'Take property photos', subtask_order: 0 },
          { title: 'Document current condition', subtask_order: 1 },
          { title: 'Identify improvement areas', subtask_order: 2 },
        ],
      },
      {
        title: 'Owner Onboarding',
        description: 'Complete owner documentation and agreements',
        task_order: 1,
        subtasks: [
          { title: 'Collect owner documents', subtask_order: 0 },
          { title: 'Sign management agreement', subtask_order: 1 },
          { title: 'Set up owner portal access', subtask_order: 2 },
        ],
      },
      {
        title: 'Legal & Compliance',
        description: 'Ensure all legal requirements are met',
        task_order: 2,
        subtasks: [
          { title: 'Verify STR permits', subtask_order: 0 },
          { title: 'Check insurance coverage', subtask_order: 1 },
          { title: 'Review HOA rules', subtask_order: 2 },
        ],
      },
    ],
  },
  {
    name: 'Design & Staging',
    color: '#8B5CF6', // purple
    phase_order: 1,
    tasks: [
      {
        title: 'Design Consultation',
        description: 'Plan property design and staging approach',
        task_order: 0,
        subtasks: [
          { title: 'Schedule design walkthrough', subtask_order: 0 },
          { title: 'Create mood board', subtask_order: 1 },
          { title: 'Approve design plan', subtask_order: 2 },
        ],
      },
      {
        title: 'Furniture & Decor',
        description: 'Source and install furniture and decor',
        task_order: 1,
        subtasks: [
          { title: 'Order furniture', subtask_order: 0 },
          { title: 'Order linens & textiles', subtask_order: 1 },
          { title: 'Order decor items', subtask_order: 2 },
          { title: 'Install all items', subtask_order: 3 },
        ],
      },
      {
        title: 'Professional Photography',
        description: 'Capture professional listing photos',
        task_order: 2,
        subtasks: [
          { title: 'Schedule photographer', subtask_order: 0 },
          { title: 'Prep property for shoot', subtask_order: 1 },
          { title: 'Review and select photos', subtask_order: 2 },
        ],
      },
    ],
  },
  {
    name: 'Listing Setup',
    color: '#10B981', // green
    phase_order: 2,
    tasks: [
      {
        title: 'Create Listing',
        description: 'Build and optimize property listing',
        task_order: 0,
        subtasks: [
          { title: 'Write listing description', subtask_order: 0 },
          { title: 'Set pricing strategy', subtask_order: 1 },
          { title: 'Upload photos', subtask_order: 2 },
          { title: 'Configure amenities', subtask_order: 3 },
        ],
      },
      {
        title: 'Platform Publishing',
        description: 'Publish listing to booking platforms',
        task_order: 1,
        subtasks: [
          { title: 'Publish to Airbnb', subtask_order: 0 },
          { title: 'Publish to VRBO', subtask_order: 1 },
          { title: 'Sync calendars', subtask_order: 2 },
        ],
      },
      {
        title: 'Smart Home Setup',
        description: 'Install and configure smart devices',
        task_order: 2,
        subtasks: [
          { title: 'Install smart lock', subtask_order: 0 },
          { title: 'Configure WiFi', subtask_order: 1 },
          { title: 'Set up noise monitor', subtask_order: 2 },
          { title: 'Test all devices', subtask_order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Launch',
    color: '#F59E0B', // amber
    phase_order: 3,
    tasks: [
      {
        title: 'Final Walkthrough',
        description: 'Complete final inspection before going live',
        task_order: 0,
        subtasks: [
          { title: 'Check all rooms', subtask_order: 0 },
          { title: 'Test all appliances', subtask_order: 1 },
          { title: 'Verify supplies stocked', subtask_order: 2 },
        ],
      },
      {
        title: 'Go Live',
        description: 'Activate listing and begin accepting bookings',
        task_order: 1,
        subtasks: [
          { title: 'Open calendar', subtask_order: 0 },
          { title: 'Set instant book', subtask_order: 1 },
          { title: 'Send owner confirmation', subtask_order: 2 },
        ],
      },
    ],
  },
]

// Get default phases for a new property
export function getDefaultPhases(): PhaseTemplate[] {
  return onboardingTemplate
}

// Count total tasks across all phases
export function getTotalTaskCount(): number {
  return onboardingTemplate.reduce((acc, phase) => acc + phase.tasks.length, 0)
}

// Count total subtasks across all phases
export function getTotalSubtaskCount(): number {
  return onboardingTemplate.reduce((acc, phase) => {
    return acc + phase.tasks.reduce((taskAcc, task) => {
      return taskAcc + (task.subtasks?.length || 0)
    }, 0)
  }, 0)
}
