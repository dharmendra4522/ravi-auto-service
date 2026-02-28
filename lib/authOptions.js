import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log("AUTHORIZE RUNNING:", credentials.username);
                console.log("SECRET EXISTS?", !!process.env.NEXTAUTH_SECRET);
                try {
                    await connectDB();
                    console.log("DB connected for auth");
                    const user = await AdminUser.findOne({ username: credentials.username });
                    console.log("User found in DB:", !!user);
                    if (!user) {
                        console.log("No user found with username", credentials.username);
                        return null;
                    }
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    console.log("Password valid:", isValid);
                    if (!isValid) return null;
                    return { id: user._id.toString(), name: user.name, username: user.username };
                } catch (err) {
                    console.error("AUTHORIZE ERROR:", err);
                    return null;
                }
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: { signIn: '/admin/login' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.username = token.username;
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};
