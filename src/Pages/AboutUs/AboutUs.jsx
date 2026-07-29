import { Helmet } from "react-helmet-async";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

const AboutUs = () => {
    return (
        <div className="my-6">
            <Helmet>
                <title>About Us</title>
            </Helmet>
            <div className="pt-4 pb-8 w-2/3 md:w-1/2 mx-auto md:mx-0">
                <h1 className="text-3xl pb-2 font-bold text-center md:text-left text-gray-700">About Us</h1>
                <p className="text-justify md:text-left">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <Tabs>
                <TabList>
                    <Tab>Story</Tab>
                    <Tab>Mission</Tab>
                    <Tab>Success</Tab>
                    <Tab>Team & Others</Tab>
                </TabList>
                <TabPanel>
                    <p>
                        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands.
                        Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>
                </TabPanel>
                <TabPanel>
                    <p>
                        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. 
                        Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>
                </TabPanel>
                <TabPanel>
                    <p>
                        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands.
                        Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>
                </TabPanel>
                <TabPanel>
                    <p>
                        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands.
                        Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>
                </TabPanel>
            </Tabs>
        </div>
    )
}
export default AboutUs;