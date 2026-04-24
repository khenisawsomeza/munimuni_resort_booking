import TopNav from "../components/landing/layout/TopNav"

export default function LandingLayout({
    children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <TopNav  />
                {children}
            </body>
        </html>
    )
}