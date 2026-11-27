---
term: "Convolutional Neural Network"
definition: "A convolutional neural network (CNN) is a type of artificial neural network designed for processing grid-like data, most commonly images."
date: "2026-11-27T11:41:55.513Z"
slug: "convolutional-neural-network"
keywords: "convolutional neural network, CNN, deep learning, image processing, computer vision, artificial neural network, machine learning, feature extraction, image recognition, object detection"
---

CNNs are a class of deep learning models inspired by the biological visual cortex. They are characterized by specialized layers that automatically and adaptively learn spatial hierarchies of features from the input.

The core components of a CNN include:

*   **Convolutional Layers:** These layers apply a set of learnable filters (kernels) to the input data. Each filter slides across the input, performing a dot product and generating a feature map that highlights specific aspects, such as edges, corners, or textures.
*   **Pooling Layers:** These layers reduce the spatial dimensions (width and height) of the feature maps, decreasing computational complexity and helping to control overfitting. Common pooling operations include max pooling (taking the maximum value within a receptive field) and average pooling (taking the average value).
*   **Activation Functions:** Non-linear functions, such as Rectified Linear Unit (ReLU), are applied after convolutional layers to introduce non-linearity, enabling the network to learn more complex patterns.
*   **Fully Connected Layers:** At the end of the network, one or more fully connected layers process the extracted features to make a final prediction or classification.

This layered architecture allows CNNs to effectively learn representations directly from raw pixel data without manual feature engineering. For instance, a CNN can identify a cat in a photograph by first recognizing basic shapes and colors, then combining these to detect features like ears and whiskers, and finally assembling these into the complete concept of a cat.

CNNs are widely employed in computer vision tasks.
They are commonly used for image recognition, object detection, image segmentation, and facial recognition.