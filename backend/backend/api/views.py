from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import cirq
import matplotlib.pyplot as plt
import numpy as np 
import json




@api_view(["POST"])
def api_home(request, *args, **kwargs):
    print(request.data)
    quantenbits = request.data[0]
    wiederholungen = int(request.data[1])

    # Initialize Simulator
    s = cirq.Simulator()

    # Circuit
    circuit = cirq.Circuit()
    qubits = []

    for quantenbit in range(len(quantenbits)):
        qubits.append(cirq.LineQubit(quantenbit))

    for widgetPosition in range(len(quantenbits[quantenbit]["widgets"])):
        for quantenbit in range(len(quantenbits)):
            match quantenbits[quantenbit]["widgets"][widgetPosition]:
                case "H":
                    circuit.append(cirq.H(qubits[quantenbit]))
                    
                case "X":
                    circuit.append(cirq.X(qubits[quantenbit]))
                    

                case "CX":
                    for quantenbitWidgetD in range(len(quantenbits)):
                        if(quantenbits[quantenbitWidgetD]["widgets"][widgetPosition] == "C-CX"):
                            circuit.append(cirq.CNOT(qubits[quantenbitWidgetD], qubits[quantenbit]))

                case "CCX":
                    position = 0
                    counter = 0
                    for quantenbitWidgetD in range(len(quantenbits)):
                        if(quantenbits[quantenbitWidgetD]["widgets"][widgetPosition] == "C-CCX" and counter == 0):
                            position = quantenbitWidgetD
                        if(quantenbits[quantenbitWidgetD]["widgets"][widgetPosition] == "C-CCX"):
                            counter = counter + 1
                        if(counter == 2):    
                            circuit.append(cirq.CCNOT(qubits[position], qubits[quantenbitWidgetD], qubits[quantenbit]))
                            break    

                case "Z":
                    circuit.append(cirq.Z(qubits[quantenbit]))
                    

                case "CZ":
                    for quantenbitWidgetD in range(len(quantenbits)):
                        if(quantenbits[quantenbitWidgetD]["widgets"][widgetPosition] == "C-CZ"):
                            circuit.append(cirq.CZ(qubits[quantenbitWidgetD], qubits[quantenbit]))

                case "CCZ":
                    position = 0
                    counter = 0
                    for quantenbitWidgetD in range(len(quantenbits)):
                        if(quantenbits[quantenbitWidgetD]["widgets"][widgetPosition] == "C-CCZ" and counter == 0):
                            position = quantenbitWidgetD
                        if(quantenbits[quantenbitWidgetD]["widgets"][widgetPosition] == "C-CCZ"):
                            counter = counter + 1
                        if(counter == 2):    
                            circuit.append(cirq.CCZ(qubits[position], qubits[quantenbitWidgetD], qubits[quantenbit]))
                            break                 
                    
              
                case _:
                    position = 0               

    
    # Wahrscheinlichkeiten der Amplituden beschaffen, bevor eine messung stattfindet
    resultPropabilities = s.simulate(circuit)     
    state_vector = resultPropabilities.final_state_vector
    probabilities = [float(prob) for prob in np.abs(state_vector)**2]
    json_data = {
        f"{state}": round(probability, 4) for state, probability in enumerate(probabilities)

    }

    print(json_data)



    # For sampling, we need to add a measurement at the end
    circuit.append(cirq.measure(qubits,  key='result'))  
    
    # Sample the circuit
    result = s.run(circuit, repetitions=wiederholungen)
    counts = result.histogram(key='result')
    

    
    return JsonResponse({
        "result": counts,
        "probabilities": json_data,
        })