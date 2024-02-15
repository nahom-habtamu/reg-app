import Link from "next/link";

export const NavBar = ({ activePage }: { activePage: string }) => {
  const activeNavStyle =
    "block py-2 px-3 rounded text-indigo-700 p-0 hover:text-indigo-500";
  const inActiveNavStyle =
    "block py-2 px-3 rounded text-gray-700 p-0 hover:text-gray-500";

  return (
    <section className="bg-white shadow-md">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 max-w-[1400px] mx-auto">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/">
            <span className="self-center h-fit text-xl font-semibold whitespace-nowrap text-indigo-400 ">
              Logo
            </span>
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className={
                    activePage === "/" ? activeNavStyle : inActiveNavStyle
                  }
                >
                  Users
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className={
                    activePage === "register"
                      ? activeNavStyle
                      : inActiveNavStyle
                  }
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};
