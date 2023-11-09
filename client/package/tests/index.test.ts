import { Assertions } from '../.'
import createClient from './index'


const opts = {
    '0': {
        subject: {
            type: 'Operation',
            property: 'summary',
        },
        description: 'example warn text',
        severity: 'warn',
        assertions: { pattern: '/example/' },
    },
    '1': {
        subject: {
            type: 'PathItem',
        },
        where: [
            {
                subject: { type: 'Operation', filterInParentKeys: ['post'], property: 'responses' },
                assertions: { defined: true },
            },
        ],
        description: 'example warn text',
        severity: 'warn',
        assertions: { mutuallyExclusive: ['summary', 'security'] },
    },
    '2': {
        subject: { type: 'PathItem', property: 'tags' },
        where: [
            { subject: { type: 'Operation', property: 'responses' }, assertions: { defined: true } },
        ],
        description: 'example warn text',
        severity: 'warn',
        assertions: { sortOrder: 'desc' },
    },
    '3': {
        subject: { type: 'Foo', property: 'test' },
        where: [
            { subject: { type: 'Bar' }, assertions: {} },
            { subject: { type: 'Baz' }, assertions: {} },
        ],
        description: 'example warn text',
        severity: 'warn',
        assertions: { sortOrder: 'desc' },
    },
    '4': {
        subject: {
            type: 'any',
            property: 'description',
        },
        description: 'example warn text',
        severity: 'warn',
        assertions: { notPattern: '/example/' },
    },
}

describe('Oas3 assertions', () => {
    it('should return the right visitor structure', () => {
        const visitors = Assertions(opts as any)
        expect(visitors).toMatchInlineSnapshot(`
      [
        {
          "Operation": {
            "enter": [Function],
          },
        },
        {
          "Operation": {
            "PathItem": {
              "enter": [Function],
            },
            "skip": [Function],
          },
        },
        {
          "Operation": {
            "PathItem": {
              "enter": [Function],
            },
            "skip": [Function],
          },
        },
        {
          "Bar": {
            "Baz": {
              "Foo": {
                "enter": [Function],
              },
            },
          },
        },
        {
          "any": {
            "enter": [Function],
          },
        },
      ]
    `)
    })
})

describe('createClient', () => {
    const clientOptions = {
        baseUrl: 'https://example.com',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should call coreFetch with the correct arguments for GET requests', async () => {
        const coreFetch = jest.fn()
        const client = createClient(clientOptions)
        client.coreFetch = coreFetch

        await client.get('/example')

        expect(coreFetch).toHaveBeenCalledWith('https://example.com/example', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    })

    it('should call coreFetch with the correct arguments for POST requests', async () => {
        const coreFetch = jest.fn()
        const client = createClient(clientOptions)
        client.coreFetch = coreFetch

        await client.post('/example', {
            body: JSON.stringify({ data: 'example' }),
        })

        expect(coreFetch).toHaveBeenCalledWith('https://example.com/example', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: 'example' }),
        })
    })

    // Add more tests for other HTTP methods
})
