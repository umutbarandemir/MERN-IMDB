import { Link } from "react-router-dom";
import { LogOut, MessageSquare, User, LogIn,Tv,Clapperboard,Droplet,Search } from "lucide-react";
import { useUserStore } from '../store/useUserStore.js';
const Navbar = () => {

    const { logout, authUser } = useUserStore();

  return (
     <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* left side */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">FilmHoynuk</h1>
            </Link>
          </div>

          {/* middle side */}
         <form className="flex-grow mx-4 max-w-md w-full hidden sm:flex">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <Search className="w-4 h-4 opacity-70" />
              <input
                type="text"
                className="grow"
                placeholder="Search movies or shows..."
                value=""
              />
            </label>
          </form>

          {/* right side */}

          <div className="flex items-center gap-2">
                        
            {authUser && authUser.username && (
              <div className="hidden sm:flex items-center px-3 py-1 rounded-lg text-sm font-medium"> {/* bg-base-200 to add background */}
                Welcome {authUser.username}
              </div>
            )}

            <Link to={"/movies"} className={`btn btn-sm gap-2 transition-colors hover:opacity-80`}>
              <Clapperboard className="w-4 h-4" />
              <span className="hidden sm:inline">Movies</span>
            </Link>

            <Link to={"/tvshows"} className={`btn btn-sm gap-2 transition-colors hover:opacity-80`}>
              <Tv className="w-4 h-4" />
              <span className="hidden sm:inline">TvShows</span>
            </Link>
                
            <Link to={"/themes"} className={`btn btn-sm gap-2 transition-colors hover:opacity-80`}>
              <Droplet className="w-4 h-4" />
              <span className="hidden sm:inline">Themes</span>
            </Link>

            {!authUser && (
                <Link to={"/login"} className={`btn btn-sm gap-2 transition-colors hover:opacity-80`}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                </Link>
            )}

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2 hover:opacity-80`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {authUser.email === "yelda123@hotmail.com" && (
                  <Link to={"/admin"} className={`btn btn-sm gap-2 hover:opacity-80`}>
                    <User className="size-5" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}

                <button className="flex gap-2 items-center hover:opacity-80" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
                
              </>
            )}
          </div>
        </div>
      </div>
    </header>

  )
}

export default Navbar