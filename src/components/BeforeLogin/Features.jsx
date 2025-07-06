import React from "react";

function Features() {
  return (
    <section className="px-6 md:px-20 py-16">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Features of DevTinder
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
          <div className="mb-4">
            <img src="/coder.svg" alt="" className="w-20" />
          </div>
          <h3 className="text-xl font-medium mb-2">Build Connections</h3>
          <p className="text-slate-400">
            Find developers with similar interests and skills to collaborate on
            projects.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
          <div className="mb-4">
            <img src="/lock.svg" alt="" className="w-20" />
          </div>
          <h3 className="text-xl font-medium mb-2">Secure Authentication</h3>
          <p className="text-slate-400">
            Login and session management using JWT ensures safe and reliable
            access.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
          <div className="mb-4">
            <img src="/project.svg" alt="" className="w-20" />
          </div>
          <h3 className="text-xl font-medium mb-2">Project Driven</h3>
          <p className="text-slate-400">
            Find partners who share your skills and interests for coding
            projects.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
