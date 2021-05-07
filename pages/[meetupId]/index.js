// import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail.js";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    //password should be repolaced and Mydatabase should be replaced with whatever
    "mongodb+srv://Anton:Narabota01@cluster0.ecnwz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  //find all meetups but return only the _ids
  const meetups = await meetupsCollection.find({}, { _id: 53 }).toArray();

  client.close();

  return {
    //if all possible urls are described then fallback is false
    fallback: false,
    paths: meetups.map((el) => {
      return {
        params: {
          meetupId: el._id.toString(),
        },
      };
    }),
  };
}

export async function getStaticProps(context) {
  //useRouter cant be used here. It can only be used in function components
  //context.params.meetupId will do the trick
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    //password should be repolaced and Mydatabase should be replaced with whatever
    "mongodb+srv://Anton:Narabota01@cluster0.ecnwz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description,
      },
    },
  };
}

export default MeetupDetails;
