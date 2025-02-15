import ProfileButton from "../profileButton";
import Sidebar from "../sidebar";

const SidebarT = async () => {
  return (
    <main>
      <Sidebar />

      <div className="z-20">
        <ProfileButton />
      </div>
    </main>
  );
};

export default SidebarT;
