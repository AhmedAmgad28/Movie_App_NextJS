import  NextAuth  from "next-auth/next";
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    providers:[
        GithubProvider({
            clientId:process.env.CLIENTID
            ,clientSecret:process.env.CLIENTSECRET
        })
    ],
    // database:"Url"
})