from setuptools import setup


setup(
    name="mfit",
    version="0.1.0",
    packages=["mfit", "produtos"],
    install_requires=[
        "django",
        "mysqlclient",
    ]
)
