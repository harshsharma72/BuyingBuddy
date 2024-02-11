from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
from uagents.query import query
import requests

class Message(Model):
    value: str
    
local_agent = Agent(
    name="local_agent",
    seed="local_agent_seed",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"],
)
print(local_agent.address)

global input_message

@local_agent.on_query(model=Message)
async def handle_query(ctx: Context, sender: str, msg: Message):
    query_message = msg.value
    # query_message = input("Enter a message: ")
    # query_message = "iPhone 9"
    print(query_message)
    await ctx.send(sender, Message(value=query_message))  # Corrected the recipient to 'sender' instead of a fixed address
    
if __name__ == "__main__":
    fund_agent_if_low(local_agent.wallet.address())
    local_agent.run()
