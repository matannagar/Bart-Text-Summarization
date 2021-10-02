import networkx as nx
import matplotlib.pyplot as plt
from named_entity_recognition.create_dictionary import *
import json


def create_entity_tree(summary):
    print("inside create entity tree")
    dictionary = json.loads(turn_into_dictionary())
    # plt.figure(figsize=(18, 15))
    mylist = []
    G = nx.DiGraph()
    G.add_node("source")
    for index in dictionary:
        if index in summary:
            print("first connection:" + index)
            G.add_node(index)
            G.add_edge("source", index)
            mylist.append(index)

    while mylist:
        for node in mylist:
            for ent in dictionary:
                if ent in dictionary[node] and node != ent:
                    print("connection found:" + node + " " + ent)
                    G.add_node(node)
                    G.add_node(ent)
                    G.add_edge(node, ent)
            mylist.remove(node)
    plt.switch_backend('agg')
    pos = nx.spring_layout(G)
    nx.draw_networkx_nodes(G, pos, node_size=500)
    nx.draw_networkx_edges(G, pos, edgelist=G.edges(), edge_color='black')
    nx.draw_networkx_labels(G, pos)
    plt.savefig("temp_graph.png", format="PNG")
    print("saved picture")
    # plt.show()
