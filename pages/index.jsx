import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="bg-white md:px-20">
      <Navbar />
      <div className="pt-24 flex flex-col gap-16 items-center px-4 md:px-8">
        <div className="flex flex-col gap-6 items-center text-center">
          <h2 className="font-semibold text-4xl md:text-6xl text-gray-900 leading-snug">
            Innovative Event Management and Ticketing Made Easy
          </h2>
          <p className="font-normal text-lg md:text-xl text-gray-600 max-w-3xl">
            Efficiently plan, promote, and execute your events while maximizing ticket sales with our platform designed for seamless event management.
          </p>
        </div>
        <div className="pb-24 w-full flex justify-center">
          <Image 
            src="/hero.png"
            width={1024}
            height={682}
            alt="Hero Image"
            className="rounded-lg w-full max-w-4xl"
          />
        </div>
      </div>
      <div className="py-24 flex flex-col gap-16 w-full px-4 md:px-8">
        <div className="flex flex-col gap-5 max-w-3xl mx-auto text-center">
          <p className="font-semibold text-base text-violet-700">Features</p>
          <h3 className="font-semibold text-2xl md:text-3xl text-gray-900">
            Features That Drive Event Excellence
          </h3>
          <p className="font-normal text-lg md:text-xl text-gray-600">
            Enhance your events with features that make planning and execution easier.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex flex-col lg:w-2/3 gap-12">
            <div className="flex flex-col md:flex-row gap-8 ">
              <div className="flex flex-col gap-5 w-full">
                <div className="w-12 h-12 rounded-full border-8 border-violet-50 bg-violet-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-violet-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-lg text-gray-900">Event Management</p>
                  <p className="font-normal text-base text-gray-600">Tools for setting up and managing events, including details like date, time, location, and descriptions.</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div className="w-12 h-12 rounded-full border-8 border-violet-50 bg-violet-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-violet-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-lg text-gray-900">Ticketing & Registration</p>
                  <p className="font-normal text-base text-gray-600">Options for creating and selling tickets, handling registrations, and managing different ticket types.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 ">
              <div className="flex flex-col gap-5 w-full">
                <div className="w-12 h-12 rounded-full border-8 border-violet-50 bg-violet-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-violet-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-lg text-gray-900">Communication Tools</p>
                  <p className="font-normal text-base text-gray-600">Automated email reminders, confirmations, and promotional messages to engage attendees before, during, and after the event.</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div className="w-12 h-12 rounded-full border-8 border-violet-50 bg-violet-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-violet-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-lg text-gray-900">Event Promotion</p>
                  <p className="font-normal text-base text-gray-600">Integration with social media and marketing tools for promoting events and reaching a wider audience.</p>
                </div>
              </div>
            </div>
          </div>
          <Image 
            src={'/mockup.png'}
            width={1024}
            height={682}
            alt="Mockup Image"
            className="absolute w-1/3 right-0 h-96 hidden md:inline-block"
          />
        </div>
      </div>
      <div className="flex flex-col py-24 gap-8 lg:gap-0 px-4 md:px-8 items-center justify-center">
        <div className="flex flex-col gap-8 items-center text-center">
          <p className="font-medium text-2xl md:text-5xl text-gray-900">Working with Epicurious has been a game-changer for us. The platform streamlined our event planning, and the support team was outstanding. We’re excited to use it for all our future events.</p>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-lg text-gray-900">Amélie Laurent</p>
            <p className="font-normal text-base text-gray-600">Product Manager, Sisyphus</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center py-24 px-4 md:px-8 gap-10">
        <div className="md:w-1/2 md:pr-3 flex flex-col gap-10">
          <h3 className="font-semibold text-3xl md:text-5xl text-gray-900 text-center lg:text-left">
            Sign up to start managing & selling tickets for your events effortlessly!
          </h3>
          <Link href={'/auth/signup'} className="rounded-lg border py-3 px-5 bg-violet-600 border-violet-600 shadow font-semibold text-base text-white w-full lg:w-fit text-center lg:text-left">
            Sign Up
          </Link>
        </div>
        <Image 
          src={'/Image.png'}
          width={1024}
          height={682}
          alt="Image"
          className="w-1/2 absolute right-0 hidden md:inline-block"
        />
      </div>
      <div className="py-24 w-full px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
            <h2 className="font-semibold text-2xl md:text-4xl text-gray-900">Sign up for our newsletter</h2>
            <p className="font-normal text-base md:text-xl text-gray-600">Be the first to know about releases and industry news and insights.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2 items-start">
            <div className="flex flex-col gap-1 w-full lg:w-3/4">
              <input type="text" className="rounded-lg border py-3 px-3.5 bg-white border-gray-300 shadow font-normal text-base text-gray-500 w-full" placeholder="Enter your email" />
              <p className="font-normal text-xs text-gray-600">We care about your data in our <Link href={'/privacy-policy'} className="underline">privacy policy</Link>.</p>
            </div>
            <button className="rounded-lg border py-3 px-5 bg-violet-600 border-violet-600 shadow font-semibold text-base text-white w-full lg:w-fit">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
