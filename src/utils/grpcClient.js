import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH =  path.resolve(__dirname, './streaming.proto');// Adjust this path as needed
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const streamingService = protoDescriptor.StreamingService;

const client = new streamingService('localhost:50051', grpc.credentials.createInsecure());

// const call = client.StreamVideo({ movieId: 'file-1730119017283-900624041' });

export function streamVideo(movieId, onData, onEnd, onError) {
    const call = client.StreamVideo({ movieId });
  
    call.on('data', onData);
    call.on('end', onEnd);
    call.on('error', onError);
  }