import networkx as nx
import matplotlib.pyplot as plt
from named_entity_recognition.create_dictionary import *
import json
import random

'''
turn graph into a tree
'''


def hierarchy_pos(G, root=None, width=1., vert_gap=0.2, vert_loc=0, xcenter=0.5):
    '''
    From Joel's answer at https://stackoverflow.com/a/29597209/2966723.  
    Licensed under Creative Commons Attribution-Share Alike 

    If the graph is a tree this will return the positions to plot this in a 
    hierarchical layout.

    G: the graph (must be a tree)

    root: the root node of current branch 
    - if the tree is directed and this is not given, 
      the root will be found and used
    - if the tree is directed and this is given, then 
      the positions will be just for the descendants of this node.
    - if the tree is undirected and not given, 
      then a random choice will be used.

    width: horizontal space allocated for this branch - avoids overlap with other branches

    vert_gap: gap between levels of hierarchy

    vert_loc: vertical location of root

    xcenter: horizontal location of root
    '''
    if not nx.is_tree(G):
        raise TypeError(
            'cannot use hierarchy_pos on a graph that is not a tree')

    if root is None:
        if isinstance(G, nx.DiGraph):
            # allows back compatibility with nx version 1.11
            root = next(iter(nx.topological_sort(G)))
        else:
            root = random.choice(list(G.nodes))

    def _hierarchy_pos(G, root, width=1., vert_gap=0.2, vert_loc=0, xcenter=0.5, pos=None, parent=None):
        '''
        see hierarchy_pos docstring for most arguments

        pos: a dict saying where all nodes go if they have been assigned
        parent: parent of this branch. - only affects it if non-directed

        '''

        if pos is None:
            pos = {root: (xcenter, vert_loc)}
        else:
            pos[root] = (xcenter, vert_loc)
        children = list(G.neighbors(root))
        if not isinstance(G, nx.DiGraph) and parent is not None:
            children.remove(parent)
        if len(children) != 0:
            dx = width/len(children)
            nextx = xcenter - width/2 - dx/2
            for child in children:
                nextx += dx
                pos = _hierarchy_pos(G, child, width=dx, vert_gap=vert_gap,
                                     vert_loc=vert_loc-vert_gap, xcenter=nextx,
                                     pos=pos, parent=root)
        return pos

    return _hierarchy_pos(G, root, width, vert_gap, vert_loc, xcenter)


def create_entity_tree(summary):

    print("creating entity tree")
    dictionary = json.loads(turn_into_dictionary())
    # plt.figure(figsize=(18, 15))

    mylist = []
    G = nx.DiGraph()
    G.add_node("source")

    tree_table = "summarization"

    for index in dictionary:
        if index in summary:
            G.add_node(index)
            G.add_edge("source", index)
            mylist.append(index)

    mylist = list(dict.fromkeys(mylist))  # no duplicates

    for unique in mylist:
        tree_table += "\n   ·"+unique

    # while mylist:
    #     print("in while loop")
    #     for node in mylist:
    #         for ent in dictionary:
    #             ent1 = ent+" "
    #             ent2 = " "+ent
    #             ent3 = " "+ent+" "
    #             if ent1 in dictionary[node] or ent2 in dictionary[node] or ent3 in dictionary[node] and node != ent:
    #                 G.add_node(node)
    #                 G.add_node(ent)
    #                 G.add_edge(node, ent)
    #                 mylist.append(ent)
    #         mylist.remove(node)
    print("finishing tree")
    plt.switch_backend('agg')
    # pos = nx.spring_layout(G)
    pos = hierarchy_pos(G, "source")
    nx.draw_networkx_nodes(G, pos, node_size=500)
    nx.draw_networkx_edges(G, pos, edgelist=G.edges(), edge_color='black')
    nx.draw_networkx_labels(G, pos)
    plt.savefig("temp_graph.png", format="PNG")
    print(tree_table)
    return tree_table


if __name__ == '__main__':
    summary = "benjamin term franklin frs frsa frse was an american polymath active as a writer, scientist, inventor, statesman, diplomat, printer, publisher and political philosopher. as a scientist, he was a major figure in the american enlightenment and the history of physics for"

    create_entity_tree(summary)
