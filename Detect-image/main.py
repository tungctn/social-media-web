import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import datasets, transforms
import numpy as np
import matplotlib.pyplot as plt
import random

epochs = 2

# Các tham số cần thiết cho quá trình traning.
learning_rate = 0.001
batch_size = 128
display_step = 100

# Path lưu best model
checkpoint = "model.pth"  # có thể để dạng *.pth

# device chúng ta dùng conda install pytorch torchvision cudatoolkit=10.2 -c pytorch

# device = "cuda" if torch.cuda.is_available() else "cpu"
# assert device == "cuda"



class Residual(nn.Module):
    def __init__(self, in_channels, num_channels, use_1x1conv=False, strides=1):
        super(Residual, self).__init__()
        self.conv1 = nn.Conv2d(
            in_channels, num_channels, kernel_size=3, padding=1, stride=strides
        )
        self.conv2 = nn.Conv2d(num_channels, num_channels, kernel_size=3, padding=1)
        self.conv3 = None  # Đừng sửa None này nhé :!
        if use_1x1conv:
            self.conv3 = nn.Conv2d(
                in_channels, num_channels, kernel_size=1, stride=strides
            )
        self.bn1 = nn.BatchNorm2d(num_channels)
        self.bn2 = nn.BatchNorm2d(num_channels)

    def forward(self, X):
        Y = nn.ReLU()(self.bn1(self.conv1(X)))
        Y = self.bn2(self.conv2(Y))
        if self.conv3:
            X = self.conv3(X)
        return nn.ReLU()(Y + X)



X = torch.randn((4, 3, 6, 6))

blk = Residual(in_channels=X.shape[1], num_channels=3)
assert blk(X).shape == (4, 3, 6, 6)
blk = Residual(in_channels=X.shape[1], num_channels=6, use_1x1conv=True, strides=2)
assert blk(X).shape == (4, 6, 3, 3)
net = nn.Sequential()
net.add_module("conv", nn.Conv2d(1, 64, kernel_size=7, stride=2, padding=3))
net.add_module("batchnorm", nn.BatchNorm2d(64))
net.add_module("Relu", nn.ReLU())
net.add_module("maxpool", nn.MaxPool2d(3, stride=2, padding=1))


def resnet_block(in_channels, num_channels, num_residuals, first_block=False):
    blk = nn.Sequential()
    for i in range(num_residuals):
        if i == 0 and not first_block:
            blk.add_module(
                "residual_{}".format(i),
                Residual(in_channels, num_channels, use_1x1conv=True, strides=2),
            )
        else:
            blk.add_module(
                "residual_{}".format(i), Residual(num_channels, num_channels)
            )
    return blk


net.add_module("resnet_block1", resnet_block(64, 64, 2, first_block=True))
net.add_module("resnet_block2", resnet_block(64, 128, 2))
net.add_module("resnet_block3", resnet_block(128, 256, 2))
net.add_module("resnet_block4", resnet_block(256, 512, 2))

net.add_module("GlobalAvr", nn.AdaptiveAvgPool2d((1, 1)))
net.add_module("Flatten", nn.Flatten())
net.add_module("FC", nn.Linear(512, 10))

transform = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))]
)

# load dataset từ torchvision.datasets
train_dataset = datasets.MNIST(
    "../data", train=True, download=True, transform=transform
)
test_dataset = datasets.MNIST("../data", train=False, transform=transform)
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size)
test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=batch_size)

model = net.to(device)
# load lại pretrained model (nếu có)
try:
    model.load_state_dict(torch.load(checkpoint))
except:
    print("!!! Hãy train để có checkpoint file")

# Define loss and optimizer
criterion = nn.CrossEntropyLoss()  # CrossEntropy
optimizer = optim.Adam(
    model.parameters(), lr=learning_rate
)  # Adam Optimizer set params=model.parameters(), lr=learning_rate
best_val_loss = 999

# Loop for each epoch
for epoch in range(1, epochs + 1):
    # Quá trình training
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)

        # Clear gradients for this training step
        optimizer.zero_grad()
        output = model(data)

        # Backpropagation, compute gradients
        loss = criterion(output, target)
        loss.backward()

        # Apply gradients
        optimizer.step()
        if batch_idx % display_step == 0:
            print(
                "Train Epoch {}: [{}/{} ({:.0f}%)]\tTrain Loss: {:.6f}".format(
                    epoch,
                    batch_idx * len(data),
                    len(train_loader.dataset),
                    100.0 * batch_idx / len(train_loader),
                    loss.item(),
                )
            )

    # Quá trình testing
    model.eval()
    test_loss = 0
    correct = 0
    # Set no grad cho quá trình testing
    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            output = F.log_softmax(
                output, dim=1
            )  # Sử dụng hàm log_sotmax để tính xác suất cho output
            test_loss += criterion(output, target)
            pred = output.argmax(
                dim=1, keepdim=True
            )  # Sử dụng hàm argmax để lấy predicted label, chú ý keepdim=True
            correct += pred.eq(target.view_as(pred)).sum().item()
    test_loss /= len(test_loader.dataset)
    if test_loss < best_val_loss:
        best_val_loss = test_loss
        torch.save(model.state_dict(), checkpoint)  # Lưu model path
        print("***********    TEST_ACC = {:.2f}%    ***********".format(correct / 100))
