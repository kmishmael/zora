export default function Page() {

    return (
        <div className="min-h-screen w-full border bg-neutral-200 flex items-center justify-center">
            <div className="bg-white border border-primary p-4 mx-4 rounded-xl w-fit text-center">
                <h2 className="font-bold text-xl mb-4">Zora System</h2>
                Sorry! You do not have sufficient permissions to access this application. Contact Your Manager for further details.
                <h2 className="mt-3">You can <a href="/auth/login" className="text-primary underline">login</a> with different credentials instead</h2>
            </div>
        </div>
    )
}