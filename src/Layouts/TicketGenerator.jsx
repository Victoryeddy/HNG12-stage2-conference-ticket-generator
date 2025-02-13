import TicketLogo from "../assets/ticket-logo.png"
export const TicketGeneratorLayout = ({ children }) => {

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-5 mx-auto pt-9">
        <nav className="border border-[#197686] rounded-4xl px-3 bg-[#05252C]/40 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center ">
            <div className="flex items-center space-x-6 ">
              <div className=" font-semibold flex items-center p-3">
                <span className=" px-2 py-3 rounded">
                  <img src={TicketLogo} alt="" />
                </span>
              </div>
            </div>
            <div className="hidden lg:flex space-x-6 text-gray-300">
              <button className=" text-white hover:text-white">Events</button>
              <button className=" text-[#B3B3B3] hover:text-white">
                My Tickets
              </button>
              <button className="text-[#B3B3B3] hover:text-white">
                About Project
              </button>
            </div>
            <button className="bg-white text-teal-950 px-4 py-3 rounded-md font-medium">
              MY TICKETS →
            </button>
          </div>
        </nav>
      </div>
      <main className="max-w-3xl mx-auto py-12 px-4">{children}</main>
    </div>
  );
};
