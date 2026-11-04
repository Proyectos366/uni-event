"use client";

import Hero from "@/components/home/Hero";
import Button from "@/components/botones/Button";
import EventsBoard from "@/components/catalog/components/EventsBoard";

const HomeView = ({ onNavigate }) => {
  return (
    <>
      <Hero />

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <h2 className="text-4xl font-black text-unievents-dark">
                  Comienza tu viaje hoy
                </h2>
                <p className="text-xl text-gray-600">
                  Únete a la plataforma líder en gestión de eventos académicos.
                </p>
                <Button
                  onClick={() => onNavigate("register")}
                  className="!px-10 !py-4 text-xl shadow-xl shadow-teal-100"
                >
                  Crear Cuenta Gratis
                </Button>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-2xl">
                <div className="aspect-video bg-teal-50 rounded-xl mb-4 flex items-center justify-center text-unievents-teal">
                  <svg
                    className="w-20 h-20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-unievents-dark text-left">
                  Eventos en Vivo
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EventsBoard limit={3} />
    </>
  );
};

export default HomeView;
