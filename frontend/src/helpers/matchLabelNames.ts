import { Label } from "@/services/attributesService";

export function matchLabelNames(labels: Label[], arr: Pick<Label, "id">[]): string[] {
    const labelNames: string[] = []
    arr.forEach((value) => {
      const matchingLabel = labels.find((label) => label.id === value.toString());
      if (matchingLabel) {
        labelNames.push(matchingLabel.name)
      } else {
        console.log(`Label with ID ${value} not found`);
      }
    });
    return labelNames
  }