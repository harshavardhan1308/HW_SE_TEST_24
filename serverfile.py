#Kothapalle Harshavardhan
import asyncio
import websockets
import json
from game import Game
game = Game()
async def handler(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        if data['type'] == 'initialize':
            game.initialize_game(data['player_a_positions'], data['player_b_positions'])
            state = game.get_game_state()
            await websocket.send(json.dumps({"type": "game_state", "state": state}))
        elif data['type'] == 'move':
            if game.validate_move(data['player'], data['char'], data['move']):
                game.process_move(data['player'], data['char'], data['move'])
                if game.check_game_over():
                    await websocket.send(json.dumps({"type": "game_over", "winner": data['player']}))
                else:
                    state = game.get_game_state()
                    await websocket.send(json.dumps({"type": "game_state", "state": state}))
            else:
                await websocket.send(json.dumps({"type": "invalid_move"}))
start_server = websockets.serve(handler, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
