import type { Prisma, Event } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        name: 'String',
        dateTime: '2023-12-09T21:25:41.642Z',
        date: '2023-12-09T21:25:41.642Z',
      },
    },
    two: {
      data: {
        name: 'String',
        dateTime: '2023-12-09T21:25:41.642Z',
        date: '2023-12-09T21:25:41.642Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Event, 'event'>
