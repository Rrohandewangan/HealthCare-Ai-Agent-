/**
 * SignalingService — in-memory presence + signaling hub.
 * In production replace with Redis adapter or Azure Web PubSub for horizontal scale.
 * The signaling server (signaling/signaling.server.js) is the actual transport.
 */
class SignalingService {
  constructor() {
    this.sockets = new Map(); // deviceId -> ws
  }

  register(deviceId, ws) {
    this.sockets.set(deviceId, ws);
  }
  unregister(deviceId) {
    this.sockets.delete(deviceId);
  }

  isOnline(deviceId) {
    return this.sockets.has(deviceId);
  }

  /** Relay an SDP/ICE message between peers. Server never inspects payload contents. */
  relay(toDeviceId, message) {
    const ws = this.sockets.get(toDeviceId);
    if (!ws) return false;
    try {
      ws.send(JSON.stringify(message));
      return true;
    } catch {
      return false;
    }
  }
}

export const signalingService = new SignalingService();
