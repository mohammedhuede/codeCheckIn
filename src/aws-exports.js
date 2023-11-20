/* eslint-disable */

//TODO: update this file during build time to reflect dev vs staging vs prod Identifiers
// const awsmobile = {
//   Auth: {
//     identityPoolRegion: "us-east-1",
//     identityPoolId: "us-east-1:ca93c115-233d-43c8-8ab0-be48e5b4c454",
//     region: "us-east-1",
//     userPoolId: "us-east-1_YRXfGm0mR",                      // s3 works properly
//     userPoolWebClientId: "6bulagmc1vfga27ue2736odg09",
//     // userPoolId: "us-east-1_pCQq4jSYU",
//     // userPoolWebClientId: "vofp3bmhrhesa6vkjo8s1u3gb",
//   },
//   Storage: {
//     AWSS3: {
//       bucket: "hospital-finder-images",
//       region: "us-east-1",
//     },
//   },
// };

const awsmobile = {
  Auth: {
    identityPoolRegion: "ap-southeast-1",
    identityPoolId: "ap-southeast-1:39c2d6ca-b8d0-4bf5-9335-05e4addef850",
    region: "ap-southeast-1",
    userPoolId: "ap-southeast-1_HwlzWRHQE",
    userPoolWebClientId: "23olb1vvr7mok3agq9ija1cqv1",
  },
  Storage: {
    AWSS3: {
      bucket: "dev-qurfy-files",
      region: "ap-southeast-1",
    },
  },
};

export default awsmobile;
