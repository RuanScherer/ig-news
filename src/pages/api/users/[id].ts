import { NextApiRequest, NextApiResponse } from 'next'

export default function getUser(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query

  const users = [
    { id: 1, name: 'Ruan' },
    { id: 2, name: 'Nicolas' },
    { id: 3, name: 'Giulia' },
  ]

  return response.json(users.find(user => user.id === Number(id)))
}
