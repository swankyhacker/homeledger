const {
  collection,
  documentId,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  addDoc,
} = require("firebase/firestore");
const { auth, db } = require("./firebase");

const addFakeBids = async () => {
  const auctionId = process.argv[2];
  const q1 = query(
    collection(db, "auction"),
    where(documentId(), "==", auctionId)
  );
  const auctionSnapshot = await getDocs(q1);
  if (auctionSnapshot.docs.length < 1) {
    console.log("Invalid Auction ID");
    return;
  }

  const extraUsers = ["Barry Allen", "Peter Parker", "Clark Kent"];
  const q2 = query(collection(db, "users"), where("name", "in", extraUsers));
  const userSnapshot = await getDocs(q2);
  // If users exist, delete them
  if (userSnapshot.docs.length > 0) {
    for (let index = 0; index < userSnapshot.docs.length; index++) {
      await deleteDoc(doc(db, "users", userSnapshot.docs[index].id));
    }
  }
  const userIds = [];
  for (let user of extraUsers) {
    const newDoc = await addDoc(collection(db, `users`), {
      email: "test@gmail.com",
      name: user,
      singPassVerified: true,
    });
    userIds.push(newDoc.id);
  }
  // check if bids already exist
  const q3 = query(
    collection(db, `auction/${auctionId}/bids`),
    where("userId", "in", userIds)
  );
  const bidSnapshot = await getDocs(q3);
  if (bidSnapshot.docs.length > 0) {
    console.log("Bids already exist");
    return;
  }
  // add fake bids
  const basePrice = 1.0;
  for (let userId of userIds) {
    await addDoc(collection(db, `auction/${auctionId}/bids`), {
      timestamp: Date.now(),
      userId: userId,
      value: Number((basePrice + Math.random()).toFixed(2)),
    });
  }
};

const main = async () => {
  await addFakeBids();
  process.exit(0);
};

main();
