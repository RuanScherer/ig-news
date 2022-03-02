import { NextApiRequest, NextApiResponse } from 'next'

export default function getUsers(request: NextApiRequest, response: NextApiResponse) {
  const users = [
    { id: 1, name: 'Ruan' },
    { id: 2, name: 'Nicolas' },
    { id: 3, name: 'Giulia' },
  ]

  return response.json(users)
}
