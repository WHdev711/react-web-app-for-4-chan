const graphql = require("graphql");

const Chan = require("./mongo-models/chan");

const Chanchild = require("./mongo-models/chanchild")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const ChanType = new GraphQLObjectType({
  name: "Chan",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    chanId: {
      type: GraphQLString,
    },
    link: {
      type: GraphQLString,
    },
    img: {
      type: GraphQLString,
    },
    replies: {
      type: GraphQLString,
    },
    imgReplies: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    op: {
      type: GraphQLString,
    },
    unique_ips: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    chan: {
      type: ChanType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Chan.findById(args.id);
      },
    },
    chans: {
      type: new GraphQLList(ChanType),
      resolve(parent, args) {
        return Chan.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addChan: {
      type: ChanType,
      args: {
        chanId: {
          type: new GraphQLNonNull(GraphQLString),
        },
        link: {
          type: new GraphQLNonNull(GraphQLString),
        },
        img: {
          type: new GraphQLNonNull(GraphQLString),
        },
        replies: {
          type: new GraphQLNonNull(GraphQLString),
        },
        imgReplies: {
          type: new GraphQLNonNull(GraphQLString),
        },
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        op: {
          type: new GraphQLNonNull(GraphQLString),
        },
        unique_ips: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        let chan = new Chan({
          chanId: args.chanId,
          link: args.link,
          img: args.img,
          replies: args.replies,
          imgReplies: args.imgReplies,
          title: args.title,
          op: args.op,
          unique_ips:args.unique_ips,
        });
        return chan.save();
      },
    },
  },
});

const ChanchildType = new GraphQLObjectType({
  name: "Chanchild",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    no: {
      type: GraphQLString,
    },
    now: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    com: {
      type: GraphQLString,
    },
    time: {
      type: GraphQLString,
    },
    resto: {
      type: GraphQLString,
    },
    trip: {
      type: GraphQLString,
    },
  }),
});

const RootchildQuery = new GraphQLObjectType({
  name: "RootchildQueryType",
  fields: {
    chan: {
      type: ChanchildType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Chanchild.findById(args.id);
      },
    },
    chanchilds: {
      type: new GraphQLList(ChanType),
      resolve(parent, args) {
        return Chanchild.find({});
      },
    },
  },
});

const Mutationchild = new GraphQLObjectType({
  name: "Mutationchild",
  fields: {
    addChanchild: {
      type: ChanchildType,
      args: {
        no: {
          type: new GraphQLNonNull(GraphQLString),
        },
        now: {
          type: new GraphQLNonNull(GraphQLString),
        },
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        com: {
          type: new GraphQLNonNull(GraphQLString),
        },
        time: {
          type: new GraphQLNonNull(GraphQLString),
        },
        resto: {
          type: new GraphQLNonNull(GraphQLString),
        },
        trip: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        let chanchild = new Chanchild({
          no: args.no,
          now: args.now,
          name: args.name,
          com: args.com,
          time: args.come,
          resto: args.resto,
          trip: args.trip,
        });
        return chanchild.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
  childquery: RootchildQuery,
  mutationchild: Mutationchild,
});
