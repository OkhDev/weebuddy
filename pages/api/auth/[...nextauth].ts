import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account }: any) {
      if (account?.access_token) {
        token.access_token = account.access_token
      }
      return token
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
