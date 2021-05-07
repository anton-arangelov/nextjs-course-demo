import React, { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList.js";
import { MongoClient } from "mongodb";
import Head from 'next/head'

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First image",
//     image:
//       "https://www.studying-in-germany.org/wp-content/uploads/2018/03/Munich.jpg",
//     address: "Some address 5, 12345 Some city",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "Second image",
//     image:
//       "https://www.studying-in-germany.org/wp-content/uploads/2018/03/Munich.jpg",
//     address: "Some address 5, 54321 Some city",
//     description: "This is a second meetup",
//   },
// ];

const HomePage = (props) => {
  return <Fragment>
    {/* for metadata */}
    <Head>
      <title>React Meetups</title>
      <meta name = "description" content="Browse a huge list of highly active react meetups" />
    </Head>
  <MeetupList meetups={props.meetups} />
  </Fragment>
};

//For data, which changes frequently and if the request and response objects are necessary
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//needs to be with this name
export async function getStaticProps() {
  //fetch data from an API

  const client = await MongoClient.connect(
    //password should be repolaced and Mydatabase should be replaced with whatever
    "mongodb+srv://Anton:Narabota01@cluster0.ecnwz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((el) => {
        return {
          title: el.data.title,
          image: el.data.image,
          address: el.data.address,
          id: el._id.toString(),
        };
      }),
      // meetups: DUMMY_MEETUPS
    },
    //how many seconds will be regenerated after
    revalidate: 10,
  };
}

export default HomePage;
