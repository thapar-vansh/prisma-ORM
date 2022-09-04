import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import prisma from '../src/index'
import { users } from '@prisma/client'


export const registerUser = async (
  username: string,
  password: string,
  type: string
): Promise<users> => {
  const hashedPassword: string = await bcrypt.hash(password, 10)
  const result: users = await prisma.users.create({
    data: {
      username: username as string,
      password: hashedPassword as string,
      type: type
    },
  })
  if (!result) {
    throw new Error('No user created !')
  }
  return result
}

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  const user: users = await prisma.users.findUnique({
    where: {
      username: username
    },
  }) as users
  if (await bcrypt.compare(password, user.password)) {
    const token: Promise<string> = generateToken(user.username, user.id)
    return token
  } else {
    throw new Error('Invalid credentials')
  }
}

export const generateToken = async (username: string, id: number): Promise<string> => {
  const privateKey: string = process.env.HASURA_JWT_PRIVATE_KEY ? process.env.HASURA_JWT_PRIVATE_KEY : ""
  const token: string = jwt.sign(
    {
      sub: id,
      iat: Math.round(new Date().getTime() / 1000),
      created: new Date().toISOString(),
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-role": "user",
        "x-hasura-user-id": String(id),
      }
    },
    privateKey,
    { "algorithm": "HS256" }
  )
  return token
}
